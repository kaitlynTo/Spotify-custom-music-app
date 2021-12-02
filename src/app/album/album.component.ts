import { Subscription } from 'rxjs';
import { MusicDataService } from './../music-data.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; //display a short confirmation message

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy {
  //properties:
  @Input() album: any;
  id: any;
  subscription: Subscription | undefined;

  constructor(private matsnackbar: MatSnackBar,
    public musicData: MusicDataService,
    private route: ActivatedRoute) { }

  //convert ms to min
  convertDuration(ms: number): number {
    let minutes: number = ms / 60000;
    return parseFloat(minutes.toPrecision(3));
  }

  addToFavourites(trackId:any):void{
    this.musicData.addToFavourites(trackId).subscribe((success:any)=>{
      this.matsnackbar.open("Adding to Favourites...", "Done", { duration: 1500 });
    },(err:any)=>{
      //Open the "snackbar" as before, only indicate that an error has occurred, ie: "Unable to add song to Favourites"
      this.matsnackbar.open("Adding to Favourites...", "Unable to add song to Favourites", { duration: 1500 });
    })
  }

  ngOnInit(): void {
 
    this.subscription = this.route.params.subscribe(params => {
      
      this.id = params['id'];

      this.musicData.getAlbumById(this.id).subscribe(data => {
        this.album = data;
        console.log(this.album)
      });      

      
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }

}
