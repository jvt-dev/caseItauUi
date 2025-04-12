import { Component, OnInit } from '@angular/core';
import { FundoService } from 'src/app/services/fundo.service';
import { FundoModel } from 'src/app/models/fundo.model';

@Component({
  selector: 'app-fundo-list',
  templateUrl: './fundo-list.component.html',
})
export class FundoListComponent implements OnInit {
  fundos: FundoModel[] = [];
  isLoading = true;

  constructor(private fundoService: FundoService) {}

  ngOnInit(): void {
    this.fundoService.getAll().subscribe({
      next: (data) => {
        this.fundos = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar fundos', err);
        this.isLoading = false;
      }
    });
  }

  deletar(codigo: string) {
    if (confirm('Tem certeza que deseja excluir?')) {
      this.fundoService.delete(codigo).subscribe(() => {
        this.fundos = this.fundos.filter(f => f.codigo !== codigo);
      });
    }
  }
}
