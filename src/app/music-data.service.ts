import { FavouritesComponent } from './favourites/favourites.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, Input } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';
import { environment } from './../environments/environment';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  @Input() favouritesList: Array<any> = [];

  constructor(private spotifyToken: SpotifyTokenService,
    private http: HttpClient,) {
  }

  getNewReleases(): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<any>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `Bearer ${token}` } })
    }));

  }

  getArtistById(id: number): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getAlbumsByArtistId(id: number): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}/albums`, {
        headers: { "Authorization": `Bearer ${token}` },
        params: {
          include_groups: 'album,single',
          limit: '50'
        }
      });
    }));
  }

  getAlbumById(id: number): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  searchArtists(searchString: string): Observable<any> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<any>(`https://api.spotify.com/v1/search`, {
        headers: { "Authorization": `Bearer ${token}` },
        params: {
          q: `${searchString}`,
          type: "artist",
          limit: '50'
        }
      });
    }));
  }

  // addToFavourites(id: string): Observable<[String]> {
  //   // TODO: make a PUT request to environment.userAPIBase/favourites/:id to add id to favourites
  //   return this.http.put<any>(`${environment.userAPIBase}/favourites/${id}`, {params:{id: id}} );
  //   // }));
  // }
  addToFavourites(id: number): Observable<boolean> {
    return new Observable<boolean>(observer => {
    if ((id == null || id == undefined) || (this.favouritesList.length >= 50)) {
      observer.error(false);
      return false;
    } else {
      this.favouritesList.push(id);
      console.log(this.favouritesList)
      observer.next(true);
      return true;
    }
    })
  }

  removeFromFavourites(id: string): Observable<any> {
    return this.http.delete<[String]>(`${environment.userAPIBase}/favourites/${id}`).pipe(mergeMap(favouritesArray => {
      // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
      if (favouritesArray.indexOf(id) != -1) {
        //2.return Observable<any> that's returned by this.getFavourties()
        favouritesArray.forEach((element, index) => {
          if (element == id) favouritesArray.splice(index, 1);
        });
      } else {
        console.log("this.favouritesList does't have given id")
      }
      return this.getFavourites();
    }));
  }
  // removeFromFavourites(id: any): Observable<any> {
  //   //1.remove id's property in favourites list (if id == fav.id) -> remove
  //   if (this.favouritesList.indexOf(id) != -1) {
  //     console.log("this.favouritesList has given id")
  //     //2.return Observable<any> that's returned by this.getFavourties()
  //     // this.favouritesList = this.favouritesList.splice(this.favouritesList.indexOf(id), 0, id);
  //     this.favouritesList.forEach((element, index) => {
  //       if (element == id) this.favouritesList.splice(index, 1);
  //     });
  //   } else {
  //     console.log("this.favouritesList does't have given id")
  //   }
  //   return this.getFavourites();
  // };

  getFavourites(): Observable<any> {
    return this.http.get<[String]>(`${environment.userAPIBase}/favourites/`).pipe(mergeMap(favouritesArray => {
      // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
      if (favouritesArray.length > 0) {
        // return new Observable<any>(observer => {
        return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
          return this.http.get<any>(`https://api.spotify.com/v1/tracks`, {
            headers: { "Authorization": `Bearer ${token}` },
            params: {
              ids: `${favouritesArray.join(",")}`
            }
          });
        }));
        // });
      } else {
        // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
        return new Observable(o => { o.next({ tracks: [] }) });
      }
    }));
  }
  // getFavourites(): Observable<any> {
  //   if (this.favouritesList.length > 0) {
  //     // return new Observable<any>(observer => {
  //     return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
  //       return this.http.get<any>(`https://api.spotify.com/v1/tracks`, {
  //         headers: { "Authorization": `Bearer ${token}` },
  //         params: {
  //           ids: `${this.favouritesList.join(",")}`
  //         }
  //       });
  //     }));
  //     // });
  //   } else {
  //     return new Observable(o => { o.next([]) });
  //   }
  // }


}