import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'cliente/cartoes', loadChildren: './cartao/cartao.module#CartaoListaPageModule' },
  { path: 'cliente/enderecos', loadChildren: './endereco/endereco.module#EnderecoPageModule' },
  { path: 'cliente', loadChildren: './cliente/cliente.module#ClientePageModule' },
  { path: 'produto', loadChildren: './produto/produto.module#ProdutoModule'},
  { path: 'carrinho', loadChildren: './carrinho/carrinho.module#CarrinhoPageModule' },
  { path: 'pedido', loadChildren: './pedido/pedido.module#PedidoPageModule' },  { path: 'ticket', loadChildren: './ticket/ticket.module#TicketPageModule' }





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
