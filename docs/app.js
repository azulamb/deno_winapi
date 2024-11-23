document.addEventListener('DOMContentLoaded', () => {
  const lang = {
    ja: 'ja-jp',
  }[window.navigator.language] || 'en-us';
  function createUrl(url, func) {
    return url.replace(/\/en-us\//, `/${lang}/`) + func.suffix;
  }

  const target = document.getElementById('data').dataset.target;

  const table = document.getElementById('list');

  function td(content) {
    const td = document.createElement('td');
    if (content) {
      if (typeof content === 'string') {
        td.textContent = content;
      } else {
        td.appendChild(content);
      }
    }
    return td;
  }

  for (const info of data.list) {
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    const funcs = [];
    let exists = false;
    if (info.base !== undefined) {
      funcs.push({
        name: info.name,
        exists: info.base,
        suffix: '',
      });
      exists |= info.base;
    }
    if (info.baseA !== undefined) {
      funcs.push({
        name: `${info.name}A`,
        exists: info.baseA,
        suffix: 'a',
      });
      exists |= info.baseA;
    }
    if (info.baseW !== undefined) {
      funcs.push({
        name: `${info.name}W`,
        exists: info.baseW,
        suffix: 'w',
      });
      exists |= info.baseW;
    }
    if (info.ex !== undefined) {
      funcs.push({
        name: `${info.name}Ex`,
        exists: info.ex,
        suffix: 'ex',
      });
      exists |= info.ex;
    }
    if (info.exA !== undefined) {
      funcs.push({
        name: `${info.name}ExA`,
        exists: info.exA,
        suffix: 'exa',
      });
      exists |= info.exA;
    }
    if (info.exW !== undefined) {
      funcs.push({
        name: `${info.name}ExW`,
        exists: info.exW,
        suffix: 'exw',
      });
      exists |= info.exW;
    }

    let first = true;
    for (const func of funcs) {
      const tr = document.createElement('tr');

      if (first) {
        const jump = document.createElement('a');
        jump.textContent = info.name;
        jump.name = info.name;
        const base = td(jump);
        if (0 < funcs.length) {
          base.rowSpan = funcs.length;
        }
        tr.appendChild(base);
        if (exists) {
          tbody.classList.add('exists');
        }
      }

      const name = td(func.name);
      if (func.exists) {
        name.classList.add('exists');
      }
      tr.appendChild(name);

      let link = null;
      if (info.url) {
        link = document.createElement('a');
        link.href = createUrl(info.url, func);
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      const url = td(link);
      tr.appendChild(url);

      tbody.appendChild(tr);
      first = false;
    }
  }

  document.getElementById('implemented').addEventListener('change', () => {
    document.body.classList.toggle('implemented');
  });
  const report = [
    {
      base: 'all',
      values: [
        {
          key: 'total',
          value: data.aggregate.all.total,
        },
        {
          key: 'implemented',
          value: data.aggregate.all.implemented,
        },
        {
          key: 'implemented_rate',
          value: (100 * data.aggregate.all.implemented / data.aggregate.all.total).toFixed(2),
        },
      ],
    },
    {
      base: 'noDuplication',
      values: [
        {
          key: 'total',
          value: data.aggregate.noDuplication.total,
        },
        {
          key: 'implemented',
          value: data.aggregate.noDuplication.implemented,
        },
        {
          key: 'implemented_rate',
          value: (100 * data.aggregate.noDuplication.implemented / data.aggregate.noDuplication.total).toFixed(2),
        },
      ],
    },
  ];
  for (const item of report) {
    for (const value of item.values) {
      document.getElementById(`${item.base}_${value.key}`).textContent = `${value.value}`;
    }
  }
  document.querySelector(`a[href="./${target}.html"]`).removeAttribute('href');
});
