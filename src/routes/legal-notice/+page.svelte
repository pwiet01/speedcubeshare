<script lang="ts">
  import { globalConfig } from '$lib/config/globalConfig';
  import { t } from '$lib/translations';
</script>

<p class="mb-5">{$t('legalNotice.tmgHint')}</p>

<h2 class="mb-2 text-2xl font-bold">{$t('legalNotice.contact.title')}</h2>
<div class="flex flex-col gap-4 sm:flex-row sm:gap-14 mb-7">
  <section>
    <p>{globalConfig.contact.name}</p>
    <p>{globalConfig.contact.street}</p>
    <p>{globalConfig.contact.city}</p>
    <p>{globalConfig.contact.country}</p>
  </section>

  <section>
    <p>{globalConfig.contact.mail}</p>
    <p>{globalConfig.url.homepage}</p>
  </section>
</div>

<section class="mb-5">
  <h2 class="mb-2 text-2xl font-bold">{$t('legalNotice.liabilityForContent.title')}</h2>
  <p>{$t('legalNotice.liabilityForContent.text')}</p>
</section>

<section class="mb-5">
  <h2 class="mb-2 text-2xl font-bold">{$t('legalNotice.liabilityForLinks.title')}</h2>
  <p>{$t('legalNotice.liabilityForLinks.text')}</p>
</section>

<section>
  <h2 class="mb-2 text-2xl font-bold">{$t('legalNotice.copyright.title')}</h2>
  <p>{$t('legalNotice.copyright.text')}</p>
</section>
