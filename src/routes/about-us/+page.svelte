<script lang="ts">
  import { globalConfig } from '$lib/config/globalConfig';
  import { t } from '$lib/translations';

  const headerClass = 'mb-2 text-2xl font-bold';
  const itemsInSection2 = 5;
</script>

<p class="mb-5">{$t('aboutUs.topText')}</p>

<section class="mb-5">
  <h2 class={headerClass}>{$t('aboutUs.section1.title')}</h2>
  <p>{$t('aboutUs.section1.text')}</p>
</section>

<section class="mb-5">
  <h2 class={headerClass}>{$t('aboutUs.section2.title')}</h2>

  <ul>
    {#each Array(itemsInSection2) as _, index (index)}
      <li class="mb-2">
        <span class="font-bold">{$t(`aboutUs.section2.list.item${index + 1}.title`)}:</span>
        <span>{$t(`aboutUs.section2.list.item${index + 1}.text`)}</span>
      </li>
    {/each}
  </ul>
</section>

<section class="mb-10">
  <h2 class={headerClass}>{$t('aboutUs.section3.title')}</h2>
  <p>{$t('aboutUs.section3.text')}</p>
</section>

<section>
  <p class="mb-5">{$t('aboutUs.keepCubing')}</p>

  <p>{globalConfig.contact.name}</p>
  <p>{$t('aboutUs.founder')}</p>
</section>
