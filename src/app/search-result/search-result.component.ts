import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private musicData: MusicDataService
  ) {}

  results: any;
  searchQuery: string | any;
  subscribe: Subscription | any;
  searchSubscription: Subscription | any;

  ngOnInit(): void {
    this.subscribe = this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'] || '';
      this.searchSubscription = this.musicData
        .searchArtists(this.searchQuery)
        .subscribe((data) => {});
    });
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
    this.subscribe?.unsubscribe();
  }
}
