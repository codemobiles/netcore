import { Component, OnInit } from '@angular/core';
import { NetworkServiceService } from 'src/app/services/network-service.service';
import { TestJSON } from 'src/app/models/test.model';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.css']
})
export class StockHomeComponent implements OnInit {

  mDataArray: Product[];

  constructor(private networkService: NetworkServiceService, private router: Router ) { }

  ngOnInit() {
    this.feedData()
  }

  feedData() {
    this.networkService.getProductAll().subscribe(
      data => {
        this.mDataArray = data.result;
      }
    )
  }

  getOutOfStock(): number {
    return 10;
  }

  deleteProduct(id: number){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async result => {
        // todo
    });
  }

  editProduct(id: number){
      this.router.navigate([`stock/edit/${id}`]);
  }

}
