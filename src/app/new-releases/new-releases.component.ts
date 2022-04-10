import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css'],
})
export class NewReleasesComponent implements OnInit {
  constructor(private data: MusicDataService) {} // CHECK

  releases: any;
  releasesSubscribe: any;

  ngOnInit(): void {
    this.releasesSubscribe = this.data.getNewReleases().subscribe((d) => {
      this.releases = d.albums.items;
    });
  }

  ngOnDestroy() {
    this.releasesSubscribe.unsubscribe();
  }
}
