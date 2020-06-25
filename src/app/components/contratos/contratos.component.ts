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
  constructor(public formbuilder: FormBuilder,
    private contratosService: ContratosService,
    private modalDialogService: ModalDialogService) { }

  ngOnInit() {
    this.GetContratos();
    this.FormRegCon = this.formbuilder.group({
      ContratoDescripcion: [
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(10)]
      ],
      EquipoRanking: [null, [Validators.required, Validators.max(999), Validators.min(0), Validators.pattern("[0-9]{1,3}")]],
      IdEquipo: [0]
    });
  }
  GetContratos(){
    this.contratosService.get()
    .subscribe((res:Contrato[]) => {
      this.Items = res;
    });
  }

}