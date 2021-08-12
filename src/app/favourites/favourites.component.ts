import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  favourites: Array<any> = []
  liveData : any;
  buttonPressed(id: number) {
    this.data.removeFromFavourites(id).subscribe(fav => {
      console.log("One Track Removed from Favourites")
      console.log(fav)
      this.favourites = fav.tracks
      console.log(fav.tracks)
    })
  }
  constructor(private data:MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.liveData = this.data.getFavourites().subscribe(fav => {
      console.log(fav)
      this.favourites = fav.tracks
      console.log(fav.tracks)
    })
  }

  ngOnDestroy() {
    this.liveData.unsubscribe();
  }
}
