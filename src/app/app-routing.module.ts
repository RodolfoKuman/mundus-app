import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "perfil",
    loadChildren: () =>
      import("./pages/perfil/perfil.module").then(m => m.PerfilPageModule)
  },

  {
    path: "estatus-cuenta",
    loadChildren: () =>
      import("./pages/estatus-cuenta/estatus-cuenta.module").then(
        m => m.EstatusCuentaPageModule
      )
  },
  {
    path: "payments",
    loadChildren: () =>
      import("./pages/payments/payments.module").then(m => m.PaymentsPageModule)
  },
  {
    path: "history-payment",
    loadChildren: () =>
      import("./pages/history-payment/history-payment.module").then(
        m => m.HistoryPaymentPageModule
      )
  },
  {
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module").then(m => m.HomePageModule)
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then(m => m.LoginPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'abono-capital',
    loadChildren: () => import('./pages/abono-capital/abono-capital.module').then( m => m.AbonoCapitalPageModule)
  },
  {
    path: 'mantenimiento',
    loadChildren: () => import('./pages/mantenimiento/mantenimiento.module').then( m => m.MantenimientoPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
