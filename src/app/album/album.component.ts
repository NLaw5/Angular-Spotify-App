import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
// import * as data from "../data/SearchResultsAlbum.json"
import { MusicDataService } from '../music-data.service';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  album:any 
  private liveData: any
  constructor(private data:MusicDataService, private route: ActivatedRoute, private snackbar: MatSnackBar) { 
  }

  buttonPressed(id: number) {
    // if(this.data.addToFavourites(id))
    // {
    //   this.snackbar.open("Adding to Favourites...","Done", {duration: 1500});
    // }

    this.data.addToFavourites(id).subscribe(album => {
      this.snackbar.open("Adding to Favourites...","Done", {duration: 1500});
    }, 
    (err) => {
      this.snackbar.open("Adding to Favourites...","Unable to add song to favourites", {duration: 1500});
    })
  }


  ngOnInit(): void {
    let id = this.route.snapshot.params['id']
    this.liveData = this.data.getAlbumsById(id).subscribe(album => {
      this.album = album
      console.log(album.tracks.items[0].id)
    })
  }

  ngOnDestroy(){
    this.liveData.unsubscribe();
  }
}
