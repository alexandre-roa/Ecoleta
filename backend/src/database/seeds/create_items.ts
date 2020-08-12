import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('items').insert([
    { title: 'Lâmpadas', image_url: 'lampadas.svg' },
    { title: 'Pilhas e baterias', image_url: 'baterias.svg' },
    { title: 'Papeis e papelão', image_url: 'papeis-papelao.svg' },
    { title: 'Residuos eletrônicos', image_url: 'eletronicos.svg' },
    { title: 'Residuos orgânicos', image_url: 'organicos.svg' },
    { title: 'Oleo de cozinha', image_url: 'oleo.svg' }
  ]);
}
