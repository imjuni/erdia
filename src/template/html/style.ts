const style = `<style>
    .bd-aside a {
      padding: .1875rem .5rem;
      margin-top: .125rem;
      margin-left: .3125rem;
      color: var(--bs-body-color);
    }

    .bd-aside a:hover,
    .bd-aside a:focus {
      color: var(--bs-body-color);
      background-color: rgba(121, 82, 179, .1);
    }

    .bd-aside .active {
      font-weight: 600;
      color: var(--bs-body-color);
    }

    .bd-aside .btn {
      padding: .25rem .5rem;
      font-weight: 600;
      color: var(--bs-body-color);
    }

    .bd-aside .btn:hover,
    .bd-aside .btn:focus {
      color: var(--bs-body-color);
      background-color: rgba(121, 82, 179, .1);
    }

    .bd-aside .btn:focus {
      box-shadow: 0 0 0 1px rgba(121, 82, 179, .7);
    }

    .bd-aside .btn::before {
      width: 1.25em;
      line-height: 0;
      content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23ccc' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
      transition: transform .35s ease;

      /* rtl:raw:
      transform: rotate(180deg) translateX(-2px);
      */
      transform-origin: .5em 50%;
    }

    .bd-aside .btn[aria-expanded="true"]::before {
      transform: rotate(90deg)/* rtl:ignore */;
    }

    /* Layout */
    @media (min-width: 1200px) {
      body {
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: 4fr 1fr;
        gap: 1rem;
      }

      .bd-header {
        position: fixed;
        top: 0;
        /* rtl:begin:ignore */
        right: 0;
        left: 0;
        /* rtl:end:ignore */
        z-index: 1030;
        grid-column: 1 / span 3;
      }

      .bd-aside,
      .bd-cheatsheet {
        padding-top: 4rem;
      }

      /**
       * 1. Too bad only Firefox supports subgrids ATM
       */
      .bd-cheatsheet,
      .bd-cheatsheet section,
      .bd-cheatsheet article {
        display: inherit; /* 1 */
        grid-template-rows: auto;
        grid-template-columns: 4fr;
        grid-column: 1 / span 2;
        gap: inherit; /* 1 */
      }

      .bd-aside {
        grid-area: 1 / 3;
        scroll-margin-top: 4rem;
      }

      .bd-cheatsheet section,
      .bd-cheatsheet section > h2 {
        top: 2rem;
        scroll-margin-top: 2rem;
      }

      .bd-cheatsheet section > h2::before {
        position: absolute;
        /* rtl:begin:ignore */
        top: 0;
        right: 0;
        bottom: -2rem;
        left: 0;
        /* rtl:end:ignore */
        z-index: -1;
        content: "";
      }

      .bd-cheatsheet article,
      .bd-cheatsheet .bd-heading {
        top: 8rem;
        scroll-margin-top: 8rem;
      }

      .bd-cheatsheet .bd-heading {
        z-index: 1;
      }
    }

    .hide {
      display: none !important;
    }
  </style>`;

export default style;
