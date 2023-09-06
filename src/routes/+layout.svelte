<script>
  import Header from '$components/layout/Header.svelte'
  import Footer from '$components/layout/Footer.svelte'
</script>

<Header />

<div class="container">
  <slot />
</div>

<Footer />

<style lang="scss">
  .container {
    padding: 1.2rem;
  }
</style>
