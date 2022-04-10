import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit {
  constructor(private route: ActivatedRoute, private data: MusicDataService) {}

  albums: any;
  artist: any;
  albumsSubscribe: any;
  artistSubscribe: any;

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];

    this.artistSubscribe = this.data
      .getArtistById(id)
      .subscribe((d) => (this.artist = d));

    this.albumsSubscribe = this.data
      .getAlbumsByArtistId(id)
      .subscribe((albumData) => {
        this.albums = albumData.items.filter(
          (curValue, index, self) =>
            self.findIndex(
              (t) => t.name.toUpperCase() === curValue.name.toUpperCase()
            ) === index
        );
      });
  }

  ngOnDestroy() {
    this.albumsSubscribe.unsubscribe();
    this.artistSubscribe.unsubscribe();
  }
}
