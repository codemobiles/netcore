import { Component, OnInit } from '@angular/core';
import { NetworkServiceService } from 'src/app/services/network-service.service';
import { TestJSON } from 'src/app/models/test.model';

@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.css']
})
export class StockHomeComponent implements OnInit {

  mDataArray: TestJSON[];

  constructor(private networkService: NetworkServiceService) { }

  ngOnInit() {
    this.feedData()
  }

  feedData() {
    this.networkService.getTest().subscribe(
      data => {
        this.mDataArray = data;
      }
    )
  }

  getOutOfStock(): number {
    return 10;
  }

}
