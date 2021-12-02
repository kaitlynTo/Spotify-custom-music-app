import { MusicDataService } from './../music-data.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  //properties
  results: any;
  searchQuery: string = "";
  subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute,
    private musicData: MusicDataService) { }

  setSearchQuery(q:string){
    this.searchQuery = q;
  }

  ngOnInit(): void {
    
    //subscribe to queryParams property from the ActivatedRotue
    this.subscription = this.route.queryParams.subscribe(params => {
      //obtain the current value of the 'q' parameter
      this.setSearchQuery(params['q']);
      //invoke searchArtists(searchString)
      this.musicData.searchArtists(this.searchQuery).subscribe(data=>{
        // this.results = data.artists.items.filter((x:any) =>{x.images.length > 0} );
        this.results = data.artists.items.filter((x:any) => {return x.images.length > 0});
        console.log(data.artists.items);
      })

    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
