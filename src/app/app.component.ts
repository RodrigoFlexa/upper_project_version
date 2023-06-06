import { Component, AfterViewInit, OnInit} from '@angular/core';
import jQuery from 'jquery'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.navigate(['home']);
  }

  ngAfterViewInit(): void {
    (function($) {
      "use strict";
      // Add active state to sidebar nav links
      var path = window.location.href;
      $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
        if ((this as HTMLAnchorElement).href === path) {
          $(this).addClass("active");
        }
      });

      // Toggle the side navigation
      $("#sidebarToggle").on("click", function(e) {
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
      });
    })(jQuery);

  }

  title = 'hospital';
}
