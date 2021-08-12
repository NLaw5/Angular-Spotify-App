import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {
 
  releases : any
  
  newAlbums : any
  liveData: any;
  constructor(private new_data: MusicDataService, private route:ActivatedRoute) {
  }

  
  ngOnInit(): void {
     this.liveData = this.new_data.getNewReleases().subscribe(MyRelease => {
       this.releases = MyRelease.albums.items
       console.log(MyRelease.albums.items)
     })
     console.log(this.releases)
  }

  ngOnDestroy(){
    this.liveData.unsubscribe()
  }
}
