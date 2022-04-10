import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private data: MusicDataService
  ) {}

  album: any;
  albumSubscribe: any;

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.albumSubscribe = this.data.getAlbumById(id).subscribe((d) => {
      this.album = d;
    });
  }

  addToFavourites(trackID: any): any {
    this.data.addToFavourites(trackID).subscribe(
      () => {
        this.snackBar.open('Adding to Favourites...', 'Done', {
          duration: 1500,
        });
      },
      () => {
        this.snackBar.open('Unable to add song to Favourites...', 'Done', {
          duration: 1500,
        });
      }
    );
  }
}
