export const mockData = {
  products: [
    {
      id: 1,
      name: 'Строительный блок 200x300x600',
      materials: [
        {
          name: 'Цемент М400',
          quantity: '25',
          unit: 'кг',
          pricePerUnit: '12.50'
        },
        {
          name: 'Песок речной',
          quantity: '100',
          unit: 'кг',
          pricePerUnit: '2.80'
        },
        {
          name: 'Щебень 5-20мм',
          quantity: '150',
          unit: 'кг',
          pricePerUnit: '3.20'
        },
        {
          name: 'Вода техническая',
          quantity: '15',
          unit: 'л',
          pricePerUnit: '0.05'
        }
      ],
      productionCosts: [
        {
          name: 'Электроэнергия',
          cost: '45.00'
        },
        {
          name: 'Амортизация оборудования',
          cost: '28.00'
        },
        {
          name: 'Заработная плата',
          cost: '85.00'
        },
        {
          name: 'Упаковка',
          cost: '12.00'
        }
      ],
      competitorPrice: '950.00'
    },
    {
      id: 2,
      name: 'Тротуарная плитка "Кирпичик"',
      materials: [
        {
          name: 'Цемент М500',
          quantity: '12',
          unit: 'кг',
          pricePerUnit: '14.80'
        },
        {
          name: 'Песок мытый',
          quantity: '35',
          unit: 'кг',
          pricePerUnit: '4.20'
        },
        {
          name: 'Пигмент красный',
          quantity: '0.8',
          unit: 'кг',
          pricePerUnit: '280.00'
        },
        {
          name: 'Пластификатор',
          quantity: '0.3',
          unit: 'кг',
          pricePerUnit: '95.00'
        }
      ],
      productionCosts: [
        {
          name: 'Электроэнергия',
          cost: '18.00'
        },
        {
          name: 'Амортизация форм',
          cost: '15.00'
        },
        {
          name: 'Заработная плата',
          cost: '42.00'
        },
        {
          name: 'Сушка и обработка',
          cost: '22.00'
        }
      ],
      competitorPrice: '680.00'
    }
  ]
};