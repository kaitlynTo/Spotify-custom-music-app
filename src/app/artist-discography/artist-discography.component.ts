import { Subscription, Observable } from 'rxjs';
import { MusicDataService } from './../music-data.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {

  //properties:
  @Input() albums: any;
  @Input() artist: any;
  id: any;
  subscription: Subscription | undefined;

  constructor(private route: ActivatedRoute,
    private musicData: MusicDataService) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.musicData.getArtistById(this.id).subscribe(data => {
        console.log("artist data:")
        this.artist = data;
        console.log(this.artist);
      })
      
      this.musicData.getAlbumsByArtistId(this.id).subscribe(data => {
        console.log("album data: ");
        this.albums = data.items.filter((v:any,i:any,a:any)=>a.findIndex((t:any)=>(t.name === v.name)) === i)
        console.log(this.albums);
      });
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
