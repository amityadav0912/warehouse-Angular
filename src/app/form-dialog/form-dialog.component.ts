import { Component ,ChangeDetectionStrategy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormDialogComponent {

  freshnessList = ["Brand New", "Second Hand", "Refurbished"]
  productForm !: FormGroup;


  constructor(private formBuilder: FormBuilder){

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
  }

  addProduct(){
    console.log(this.productForm.value);
  }

}
