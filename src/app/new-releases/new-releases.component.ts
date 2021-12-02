import { Subscription } from 'rxjs';
import { MusicDataService } from './../music-data.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit,OnDestroy {

  //properties
  @Input() releases: Array<any> = [];
  subscription: Subscription | undefined;

  constructor(private musicData: MusicDataService) { }

  ngOnInit(): void { 
    this.subscription = this.musicData.getNewReleases().subscribe(mData=>{
      this.releases = mData.albums.items as [];
      console.log("new-releases component: ");
      console.log(this.releases);
    })
  }  

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }

}
