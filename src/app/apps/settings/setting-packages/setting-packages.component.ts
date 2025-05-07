import { Component, ElementRef, inject, signal, ViewChild, WritableSignal } from '@angular/core';
import { FileUploadWithPreview } from 'file-upload-with-preview';
import { IconModule } from "../../../shared/icon/icon.module";
import { PackagesService } from 'src/app/service/packages/packages.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-setting-packages',
  standalone: true,
  imports: [IconModule, ReactiveFormsModule],
  templateUrl: './setting-packages.component.html',
  styleUrl: './setting-packages.component.css'
})
export class SettingPackagesComponent {
    private readonly _FormBuilder = inject(FormBuilder)
    private readonly _PackagesService = inject(PackagesService)

    allPackages:WritableSignal<any[]> = signal([])
    // myUploader: any;
    ngOnInit() {
        // this.myUploader = new FileUploadWithPreview('myFirstImage', {
        //     images: {
        //         baseImage: '/assets/images/file-preview.svg',
        //         backgroundImage: '',
        //     },
        // });

        this.getAllPackages()
    }

    getAllPackages():void{
        this._PackagesService.getAllPackages().subscribe({
            next:(res)=>{
                this.allPackages.set(res.data)
                console.log(res.data);

            }
        })
    }

    packageForm:FormGroup = this._FormBuilder.group({
        Title:[''],
        SubTitle:[''],
        Price:[''],
        OfferPrice:[''],
        Description:[''],
        DurationByDays:[''],
        LessonsNumber:[''],
        Rate:[0],
        Image:[''],
    })

    selectedFile: WritableSignal<File | null> = signal(null);
    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) return;
        this.selectedFile.set(input.files[0]);
      }


    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
    submitPackageForm():void{
        let data = this.packageForm.value
        // const uploadedFiles = this.myUploader.cachedFileArray;
        // const file = uploadedFiles[0];
        // this.packageForm.patchValue({ Image: file });
        // this.packageForm.get('Image')?.updateValueAndValidity();
        // data.Image = this.packageForm.get('Image')?.value

        let formData = new FormData()
        formData.append('Title', data.Title)
        formData.append('SubTitle', data.SubTitle)
        formData.append('Price', data.Price)
        formData.append('OfferPrice', data.OfferPrice)
        formData.append('Description', data.Description)
        formData.append('DurationByDays', data.DurationByDays)
        formData.append('LessonsNumber', data.LessonsNumber)
        formData.append('Rate', '0')
        // formData.append('Image', data.Image);
        formData.append('Image', this.selectedFile()!);
        this._PackagesService.createPackages(formData).subscribe({
            next:(res)=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Package added successfully',
                    customClass: { popup: 'sweet-alerts' },
                });
                this.packageForm.reset()
                this.getAllPackages()
                this.fileInput.nativeElement.value = '';
            }
        })
    }

    deletePackage(id:string):void{
        this._PackagesService.deletePackages(id).subscribe({
            next:(res)=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Package deleted successfully',
                    customClass: { popup: 'sweet-alerts' },
                });
                this.getAllPackages()
            }
        })
    }
}
