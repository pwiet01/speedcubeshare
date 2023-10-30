<script lang="ts">
  import { globalConfig } from '$lib/config/globalConfig';
</script>

<h1 class="mb-6 text-4xl">Legal Notice</h1>

<div class="mb-4">
  <p>{globalConfig.contact.name}</p>
  <p>{globalConfig.contact.street}</p>
  <p>{globalConfig.contact.city}</p>
  <p>{globalConfig.contact.country}</p>
</div>

<div>
  <p>{globalConfig.contact.mail}</p>
</div>
