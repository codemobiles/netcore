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
        this.mProductArray = result.result.map(
          item => {
            item.image = this.netWorkService.productImageURL + "/" + item.image
            return item
          }
        )
      }
    )
  }

  onClickAddOrder(item: Product) {
    const foundIndex = this.mOrderArray.indexOf(item);

    if (foundIndex === -1) {
      item.qty = 1;
      this.mOrderArray.unshift(item);
    } else {
      item.qty++;
    }
    this.countSumPrice();
  }
  countSumPrice() {
    this.mTotalPrice = 0;
    for (const item of this.mOrderArray) {
      this.mTotalPrice += item.price * item.qty
    }
  }

  isSelectedItem(item: Product) {
    return this.mOrderArray.indexOf(item) === -1 ? false : true;
  }

  onClickRemoveOrder(item: Product) {
    this.mProductArray.map(data => {
      if (item.productId === data.productId) {
        data.qty = null;
      }
    });

    this.mOrderArray.splice(this.mOrderArray.indexOf(item), 1);
    this.countSumPrice();
  }

  onClickPayment() {
    if (this.mTotalPrice > 0) {
      this.mIsPaymentShow = !this.mIsPaymentShow
    } else {
      alert("order require!!!")
    }
  }

  submitPayment(){
    this.mTotalPrice = 0;
    this.mProductArray = new Array<Product>();
    this.mOrderArray = new Array<Product>();
    this.feedData();
    this.mIsPaymentShow = false;

  }


}
