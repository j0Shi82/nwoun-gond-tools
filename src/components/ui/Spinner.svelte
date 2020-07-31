<style lang="scss">
    .loader {
      border-top-color: #000;
      -webkit-animation: spinner 1.5s linear infinite;
      animation: spinner 1.5s linear infinite;
    }

    @-webkit-keyframes spinner {
      0% { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spinner {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
</style>
    
<div class="w-full">
    <div class="loader ease-linear rounded-full border-8 border-t-8 border-nwoun h-64 w-64 m-auto"></div>
</div>