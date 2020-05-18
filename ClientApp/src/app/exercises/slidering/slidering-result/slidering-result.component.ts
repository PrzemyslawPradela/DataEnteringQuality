import { Component, OnInit } from '@angular/core';
import { SlideringService } from 'src/app/_services/slidering.service';

@Component({
  selector: 'app-slidering-result',
  templateUrl: './slidering-result.component.html',
  styleUrls: ['./slidering-result.component.css']
})
export class SlideringResultComponent implements OnInit {

  constructor(private slideringService: SlideringService) { }

  ngOnInit() {
    const a = this.slideringService.getSlideringResult();
    console.log(a);
  }

}
