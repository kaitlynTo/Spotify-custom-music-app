import { MusicDataService } from './../music-data.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  @Input() favourites: Array<any> = [];

  constructor(private musicData: MusicDataService) { }


  removeFromFavourites(id:any):void{
    console.log("trackid:"+ id)
    console.log("inside favouriteComponent's removeFromFavourites")
    this.musicData.removeFromFavourites(id).subscribe(data => {
      this.favourites = data.tracks;
      console.log("updated favourites:")
      console.log(this.favourites)
    })
  }

  ngOnInit(): void {
    this.musicData.getFavourites().subscribe(data => {
      this.favourites = data.tracks;
      console.log("favourites: ")
      console.log(this.favourites)
    });
    
  }

}
