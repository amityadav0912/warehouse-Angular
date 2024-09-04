import { Component ,ChangeDetectionStrategy, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDialogComponent {

  freshnessList = ["Brand New", "Second Hand", "Refurbished"]
  productForm !: FormGroup;
  actionButton: string = "Submit";
  

  constructor(private formBuilder: FormBuilder, 
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<FormDialogComponent>
  ){

  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      date:['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required]
    })


    if(this.editData){
      this.actionButton = "Update";
      this.productForm.controls['productName'].setValue(this.editData.productName)
      this.productForm.controls['category'].setValue(this.editData.category)
      this.productForm.controls['date'].setValue(this.editData.date)
      this.productForm.controls['freshness'].setValue(this.editData.freshness)
      this.productForm.controls['price'].setValue(this.editData.price)
      this.productForm.controls['comment'].setValue(this.editData.comment)

    }
  }

  addProduct(){
    if(!this.editData)
    {
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next:()=>{
            alert("Product added Succesfully");
            this.dialogRef.close('Submit')
          },
          error:()=>{
            alert("Error in adding product");
          }
        })
      }
    }else {
      this.updateProduct(this.editData);
    }
  }

  updateProduct(editData: any){
    this.api.putProduct(this.productForm.value, this.editData.id)
    .subscribe({
      next:()=>{
        alert("Product updated Succesfully");
        this.dialogRef.close('Update')
      },
      error:()=>{
        alert("Error in updating product");
      }
    })
  }
}
