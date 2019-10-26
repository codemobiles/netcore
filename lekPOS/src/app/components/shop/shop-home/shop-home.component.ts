import { Component, OnInit } from '@angular/core';
import { NetworkServiceService } from 'src/app/services/network-service.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-shop-home',
  templateUrl: './shop-home.component.html',
  styleUrls: ['./shop-home.component.css']
})

export class ShopHomeComponent implements OnInit {

  mIsPaymentShow = false;
  mProductArray = new Array<Product>();
  mOrderArray = new Array<Product>();
  mTotalPrice = 0;

  constructor(private netWorkService: NetworkServiceService) { }

  ngOnInit() {
    this.feedData()
  }

  feedData() {
    this.netWorkService.getProductAll().subscribe(
      result => {
        this.mProductArray = result.result
      }
    )
  }

}
