

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    datos = {
        nombre: '',
        email: '',
        imagen: null as File | null // Cambiamos el tipo de imagen a File | null
    };
    tarjetas: any[] = [];

    constructor(private http: HttpClient) {}

    onFileChange(event: Event) {
        const target = event.target as HTMLInputElement; // Hacemos un casting a HTMLInputElement
        const file = target.files ? target.files[0] : null; // Verificamos si hay archivos
        this.datos.imagen = file;
    }

    onSubmit() {
        const formData = new FormData();
        formData.append('nombre', this.datos.nombre);
        formData.append('email', this.datos.email);

        if (this.datos.imagen) {
          formData.append('imagen', this.datos.imagen);
        }

        this.http.post('http://localhost:8000/api/datos/', formData).subscribe(response => {
            console.log('Datos enviados', response);
        });


    }
}
