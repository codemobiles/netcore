import { Component, OnInit } from '@angular/core';
import { NetworkServiceService } from 'src/app/services/network-service.service';
import { TestJSON } from 'src/app/models/test.model';
import Swal from 'sweetalert2'
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

}
