import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  results: any;
  searchQuery: any;
  sub: any;
  constructor(private data:MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe(params=>{
      this.searchQuery = params;
    })

    this.data.searchArtists(this.searchQuery.q).subscribe(returnValues => {
      let realdata = returnValues.artists.items;
      console.log(realdata)
      realdata = realdata.filter((asdf: any) => asdf.images.length != 0)
      console.log(returnValues.artists.items)
      // this.results = returnValues.artists.items
      this.results = realdata;
    })
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
