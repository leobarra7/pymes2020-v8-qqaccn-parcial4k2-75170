import { Component, OnInit } from '@angular/core';
import {Contrato} from '../../models/contrato';
import {ContratosService} from '../../services/contratos.service';
import { ReactiveFormsModule } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDialogService } from "../../services/modal-dialog.service";

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {
  Items: Contrato[] = [];
  Titulo = "Contratos"
  submitted = false;
   TituloAccionAL = {
    A:"(Alta)",
    L:"(Listado)"
  };
  AccionAL = "L"; //INICIALMENTE INICIA EN EL LISTADO DE CONTRATOS
  FormRegCon: FormGroup;
  Mensajes = {
    RD: " Revisar los datos ingresados..."
  };
  constructor(public formbuilder: FormBuilder,
    private contratosService: ContratosService,
    private modalDialogService: ModalDialogService) { }

  ngOnInit() {
    this.GetContratos();
    this.FormRegCon = this.formbuilder.group({
      ContratoDescripcion: [
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(50)]
      ],
      ContratoImporte: [null, [Validators.required, Validators.min(0), Validators.pattern("[0-9]{1,10}")]],
      IdContrato: [0]
    });
  }
  GetContratos(){
    this.contratosService.get()
    .subscribe((res:Contrato[]) => {
      this.Items = res;
    });
  }

  Alta() {
    this.AccionAL = "A";
    this.FormRegCon.reset(this.FormRegCon.value);
    this.submitted = false;
    this.FormRegCon.markAsUntouched();
  }
   // Obtengo un registro especifico según el Id
  BuscarPorId(Dto, AccionAL) {
    window.scroll(0, 0); // ir al incio del scroll
    this.contratosService.getById(Dto.IdContrato).subscribe((res: any) => {
      this.FormRegCon.patchValue(res);
      this.AccionAL = AccionAL;
    });
  }

Grabar(){
    this.submitted = true;
    // verificar que los validadores esten OK
    if (this.FormRegCon.invalid) {
      return;
    }
    //hacemos una copia de los datos del formulario
    const itemCopy = { ...this.FormRegCon.value };

    // agregar post - se hace con el if para luego poder hacer la modificacion
    // sin embargo en este caso no lo hacemos pero lo dejamos asi para que sea
    // un codigo escalable
    this.contratosService.post(itemCopy).subscribe((res: any) =>{
      this.Volver();
      this.modalDialogService.Alert('Registro agregado correctamente');
      this.GetContratos();
    });
  }
  // Volver desde Agregar
  Volver() {
    this.AccionAL = "L";
  }

}