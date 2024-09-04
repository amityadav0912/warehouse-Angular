import { Component, inject, ChangeDetectionStrategy, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { ApiService } from './service/api.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit{
  title = 'warehouse';
  readonly dialog = inject(MatDialog);

  displayedColumns: string[] = ['id', 'productName', 'category', 'freshness', 'date', 'price', 'comment', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private api: ApiService){

  }
  ngOnInit(): void {
    this.getAllProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog() {
    this.dialog.open(FormDialogComponent).afterClosed().subscribe(result => {
      if(result === 'Submit'){
        this.getAllProducts();
      }
    });
  }

  getAllProducts(){
    this.api.getProducts()
      .subscribe({
        next:(res) =>{
          this.dataSource= new MatTableDataSource(res);
          
        },
        error:()=>{
          console.log("error in getting all products");
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProducts(row: any){
    this.dialog.open(FormDialogComponent, {
      data:row
    }).afterClosed().subscribe(result => {
      if(result === 'Update'){
        this.getAllProducts();
      }
    });
  }

  deleteProduct(id: number){
    this.api.deleteProduct(id)
      .subscribe({
        next:()=>{
          alert("Product Deleted Succesfully");
          this.getAllProducts();
        },
        error:()=>{
          alert("Error in Deleting product");
        }
      })
  }


}
