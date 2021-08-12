import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';
import { mergeMap } from 'rxjs/operators';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {
  // favouritesList:Array<any> = [];
  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) { }  
  
  getNewReleases(): Observable<any> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<SpotifyApi.ListOfNewReleasesResponse>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `Bearer ${token}` } });
      }));
  }
  getArtistById(id:any): Observable<any>{
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token =>{
        return this.http.get<SpotifyApi.SingleArtistResponse>(`https://api.spotify.com/v1/artists/${id}`, {headers : { "Authorization": `Bearer ${token}` } });
      }));
  }
  getAlbumsByArtistId(id:any): Observable<any>{
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token =>{
      return this.http.get<SpotifyApi.ArtistsAlbumsResponse>(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`, {headers : { "Authorization": `Bearer ${token}` } });
    }));
  }
  getAlbumsById(id:any):Observable<any>{
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token =>{
      return this.http.get<SpotifyApi.SingleAlbumResponse>(`https://api.spotify.com/v1/albums/${id}`, {headers : { "Authorization": `Bearer ${token}` } });
    }));
  }
  searchArtists(searchString:any): Observable<any>{
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token =>{
      return this.http.get<SpotifyApi.ArtistSearchResponse>(`https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`, {headers : { "Authorization": `Bearer ${token}` } });
    }));
  }

  //Assignment 5:
  // addToFavourites(id:any):Boolean{
  //   if(id == null || id == undefined || this.favouritesList.length > 50){
  //     return false;
  //   }else{
  //     this.favouritesList.push(id);
  //     console.log(this.favouritesList);
  //     return true;
  //   }
  // }

  // removeFromFavourites(id:any): Observable<any>{
  //   const returnValue = this.favouritesList.indexOf(id);
  //   this.favouritesList.splice(returnValue,1);
  //   return this.getFavourites();
  // }

  // getFavourites():Observable<any>{
  //   console.log(this.favouritesList)
  //   if(this.favouritesList.length >0){
  //     let ids= this.favouritesList.join(','); //use join method to join all ids together
  //     console.log("Showing ids of favouriteList:")
  //     console.log(ids);
  //     return this.spotifyToken.getBearerToken().pipe(mergeMap(token =>{
  //       return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${ids}`, {headers : { "Authorization": `Bearer ${token}` } });
  //     }));
  //   }
  //   else
  //   {
  //     console.log("Favourite List is empty")
  //     return new Observable(o=>{o.next([])});
  //   }
  // }

  //Assignment 6:
  addToFavourites(id: any): Observable<[String]> {
    // TODO: make a PUT request to environment.userAPIBase/favourites/:id to add id to favourites
    console.log(`${environment.userAPIBase}/favourites/`)
    return this.http.put<[any]>(`${environment.userAPIBase}/favourites/${id}`, id)
  }
  
  removeFromFavourites(id: any): Observable<any> {
    return this.http.delete<[String]>(`${environment.userAPIBase}/favourites/${id}`).pipe(mergeMap(favouritesArray => {
      // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
      // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
      if(favouritesArray.length >0){
        let ids= favouritesArray.join(','); //use join method to join all ids together
        console.log("Showing ids of favouriteList:")
        console.log(ids);
        return this.spotifyToken.getBearerToken().pipe(mergeMap(token =>{
          return this.http.get<SpotifyApi.MultipleTracksResponse>(`https://api.spotify.com/v1/tracks?ids=${ids}`, {headers : { "Authorization": `Bearer ${token}` } });
        }));
      }
      else
      {
        console.log("Favourite List is empty")
        return new Observable(o=>o.next({tracks: []}));
      }
    }));
  }
  
  getFavourites(): Observable<any> {
    return this.http.get<[String]>(`${environment.userAPIBase}/favourites/`).pipe(mergeMap(favouritesArray => {
      // TODO: Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
      // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}

      console.log(favouritesArray)
      if(favouritesArray.length >0){
        let ids= favouritesArray.join(','); //use join method to join all ids together
        console.log("Showing ids of favouriteList:")
        console.log(ids);
        return this.spotifyToken.getBearerToken().pipe(mergeMap(token =>{
          return this.http.get<SpotifyApi.MultipleTracksResponse>(`https://api.spotify.com/v1/tracks?ids=${ids}`, {headers : { "Authorization": `Bearer ${token}` } });
        }));
      }
      else
      {
        console.log("Favourite List is empty")
        return new Observable(o=>o.next({tracks: []}));
      }
    }));
  }
}