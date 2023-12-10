<script lang="ts">
  import { globalConfig } from '$lib/config/globalConfig';
  import { t } from '$lib/translations';

  const currentYear = new Date().getFullYear();
  const pageName = globalConfig.info.name;
</script>

<footer class="body-full-width-section bg-neutral">
  <div class="footer footer-center py-10 bg-neutral text-neutral-content">
    <nav class="flex items-center justify-center gap-4 flex-wrap">
      <a href="/about-us">{$t('common.pageTitle.aboutUs')}</a>
      <a href="/legal-notice">{$t('common.pageTitle.legalNotice')}</a>
    </nav>
    <nav>
      <div class="grid grid-flow-col gap-4">
        <a target="_blank" href={globalConfig.url.projectGitHub} class="pr-0">
          <i class="fa-brands fa-github fa-2xl" />
        </a>
      </div>
    </nav>
    <aside>
      <span>
        {$t('common.footer.bottomNote', { s1: currentYear.toString(), s2: pageName })}
        <a target="_blank" href={globalConfig.url.homepage} class="inline text-link">
          {globalConfig.contact.name}
        </a>
      </span>
    </aside>
  </div>
</footer>

<style>
  a {
    padding: 0;
  }

  .footer {
    row-gap: 1.5rem;
  }
</style>
