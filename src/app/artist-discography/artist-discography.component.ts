import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';
import { analyzeAndValidateNgModules, isNgTemplate } from '@angular/compiler';
@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {
  albums:any;
  artist:any;
  private liveArtistData:any;
  private liveData:any;
  constructor(private data:MusicDataService, private route:ActivatedRoute ) { 
  }


  ngOnInit(): void {
    let artistId= this.route.snapshot.params['id'];
    this.liveArtistData= this.data.getArtistById(artistId).subscribe(artist=>{this.artist= artist; console.log(artist)});
    this.liveData= this.data.getAlbumsByArtistId(artistId).subscribe(albumData=>{

      this.albums = albumData.items.filter((dataOfAlbum:any, index: Number) => {
        return index === albumData.items.findIndex((i:any) => i.name.toLowerCase() === dataOfAlbum.name.toLowerCase())
        //returns only items that are not duplicated names
      });
    });
  }
  ngOnDestroy():void{
    this.liveArtistData.unsubscribe();
    this.liveData.unsubscribe();
  }
}
