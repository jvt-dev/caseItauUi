import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FundoService } from 'src/app/services/fundo.service';
import { TipoFundoService } from 'src/app/services/tipo-fundo.service';
import { FundoModel } from 'src/app/models/fundo.model';
import { TipoFundoModel } from 'src/app/models/tipo-fundo.model';

@Component({
  selector: 'app-fundo-form',
  templateUrl: './fundo-form.component.html',
})
export class FundoFormComponent implements OnInit {
  fundoForm!: FormGroup;
  isEditMode = false;
  isReadOnly = false;
  isInsertMode = false;
  exibirCampoMovimentar = false;
  novoValorPatrimonioControl = new FormControl(null, Validators.required);
  formMode: string = '';
  codigo!: string;
  tiposFundo: TipoFundoModel[] = []; 

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private fundoService: FundoService,
    private tipoFundoService: TipoFundoService
  ) {}

  ngOnInit(): void {
    const urlSegments = this.route.snapshot.url;
  
    if (urlSegments.length > 1) {
      const urlPath = urlSegments[1].path;
  
      if (urlPath === 'editar') {
        this.formMode = 'editar';
      } else if (urlPath === 'detalhes') {
        this.formMode = 'detalhes';
      } else {
        this.formMode = 'novo';
      }
    } else {
      this.formMode = 'novo';
    }

    const codigo = this.route.snapshot.paramMap.get('codigo');
    
    this.isEditMode = this.formMode === 'editar';
    this.isReadOnly = this.formMode === 'detalhes';
    this.isInsertMode = this.formMode === 'novo';
    this.fundoForm = this.fb.group({
      codigo: [{ value: '', disabled: this.isEditMode || this.isReadOnly }, Validators.required],
      nome: [{ value: '', disabled: this.isReadOnly }, Validators.required],
      cnpj: [{ value: '', disabled: this.isReadOnly }, [Validators.required, this.cnpjValidator.bind(this)]],
      patrimonio: [{ value: 0, disabled: !this.isInsertMode }, Validators.required],
      codigoTipo: [{ value: '', disabled: this.isReadOnly }, Validators.required],
      nomeTipo: [{ value: '', disabled: this.isReadOnly }]
    });

    this.tipoFundoService.getAll().subscribe(tipos => {
      this.tiposFundo = tipos;
    })
    
    if (codigo) {
      this.fundoService.getByCodigo(codigo).subscribe(fundo => {
        this.fundoForm.patchValue(fundo);
        this.codigo = fundo.codigo;
      });
    }
  }
  
  salvar() {
    if (this.fundoForm.invalid || this.isReadOnly) return;

    const fundo: FundoModel = this.fundoForm.getRawValue();
    fundo.codigoTipo = Number(fundo.codigoTipo);
    if (this.isEditMode) {
      this.fundoService.update(this.codigo, fundo).subscribe(() => this.router.navigate(['/fundos']));
    } else {
      this.fundoService.create(fundo).subscribe(() => this.router.navigate(['/fundos']));
    }
  }

  habilitarEdicao() {
    this.isReadOnly = false;
    this.isEditMode = true;
    Object.keys(this.fundoForm.controls).forEach(key => {
      if (key !== 'codigo' && key !== 'patrimonio') {
        this.fundoForm.get(key)?.enable();
      }
    });
  }

  movimentar() {
    const valor = this.novoValorPatrimonioControl.value;
  
    if (this.codigo && this.novoValorPatrimonioControl.valid) {
      const patrimonioAtual = this.fundoForm.get('patrimonio')?.value;
      
      const novoPatrimonio = patrimonioAtual + valor;
  
      this.fundoService.movimentarPatrimonio(this.codigo, valor).subscribe(() => {
        this.fundoForm.patchValue({ patrimonio: novoPatrimonio });
        this.exibirCampoMovimentar = false;
        this.novoValorPatrimonioControl.reset();
      });
    }
  }

  cnpjValidator(control: AbstractControl): ValidationErrors | null {
    const cnpj = control.value?.replace(/\D/g, '');
    if (!cnpj || !/^\d{14}$/.test(cnpj)) {
      return { invalidCnpj: true };
    }
  
    if (/^(\d)\1+$/.test(cnpj)) {
      return { invalidCnpj: true };
    }
    
    return null;
  }

  getTipoFundoNome(): string {
    const codigoTipo = this.fundoForm.get('codigoTipo')?.value;
    const tipoFundo = this.fundoForm.get('nomeTipo')?.value;

    return tipoFundo ? `${codigoTipo} - ${tipoFundo}` : '';
  }
}
