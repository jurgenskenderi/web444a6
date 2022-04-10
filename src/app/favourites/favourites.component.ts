import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
})
export class FavouritesComponent implements OnInit {
  constructor(private data: MusicDataService) {}
  favourites: Array<any> = [];
  favouriteSubscription: Subscription | any;
  ngOnInit(): void {
    this.favouriteSubscription = this.data
      .getFavourites()
      .subscribe((d) => (this.favourites = d.tracks));
  }

  removeFromFavourites(id: string): void {
    this.data
      .removeFromFavourites(id)
      .subscribe((d) => (this.favourites = d.tracks));
  }

  ngOnDestroy(): void {
    this.favouriteSubscription?.unsubscribe();
  }
}
