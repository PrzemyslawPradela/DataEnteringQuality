import { Component, OnInit } from '@angular/core';
import { PointingService } from 'src/app/_services/pointing.service';

@Component({
  selector: 'app-pointing-result',
  templateUrl: './pointing-result.component.html',
  styleUrls: ['./pointing-result.component.css']
})
export class PointingResultComponent implements OnInit {

  constructor(private pointingService: PointingService) { }

  ngOnInit() {
    const a = this.pointingService.getPointingResult();
    console.log(a);
  }

}
