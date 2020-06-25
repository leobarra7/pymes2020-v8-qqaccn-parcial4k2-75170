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
  constructor() { }

  ngOnInit() {
  }

}