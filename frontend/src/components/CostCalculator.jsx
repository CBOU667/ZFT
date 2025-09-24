import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Plus, Trash2, Calculator, TrendingUp, Package, BarChart3 } from 'lucide-react';
import { mockData } from '../mock/mockData';

const CostCalculator = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    materials: [{ name: '', quantity: '', unit: 'кг', pricePerUnit: '' }],
    productionCosts: [{ name: '', cost: '' }],
    competitorPrice: ''
  });

  useEffect(() => {
    setProducts(mockData.products);
  }, []);

  const addMaterial = (productIndex = null) => {
    if (productIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[productIndex].materials.push({ name: '', quantity: '', unit: 'кг', pricePerUnit: '' });
      setProducts(updatedProducts);
    } else {
      setNewProduct({
        ...newProduct,
        materials: [...newProduct.materials, { name: '', quantity: '', unit: 'кг', pricePerUnit: '' }]
      });
    }
  };

  const removeMaterial = (materialIndex, productIndex = null) => {
    if (productIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[productIndex].materials.splice(materialIndex, 1);
      setProducts(updatedProducts);
    } else {
      const updatedMaterials = newProduct.materials.filter((_, index) => index !== materialIndex);
      setNewProduct({ ...newProduct, materials: updatedMaterials });
    }
  };

  const addProductionCost = (productIndex = null) => {
    if (productIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[productIndex].productionCosts.push({ name: '', cost: '' });
      setProducts(updatedProducts);
    } else {
      setNewProduct({
        ...newProduct,
        productionCosts: [...newProduct.productionCosts, { name: '', cost: '' }]
      });
    }
  };

  const removeProductionCost = (costIndex, productIndex = null) => {
    if (productIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[productIndex].productionCosts.splice(costIndex, 1);
      setProducts(updatedProducts);
    } else {
      const updatedCosts = newProduct.productionCosts.filter((_, index) => index !== costIndex);
      setNewProduct({ ...newProduct, productionCosts: updatedCosts });
    }
  };

  const calculateMaterialsCost = (materials) => {
    return materials.reduce((total, material) => {
      const quantity = parseFloat(material.quantity) || 0;
      const price = parseFloat(material.pricePerUnit) || 0;
      return total + (quantity * price);
    }, 0);
  };

  const calculateProductionCost = (productionCosts) => {
    return productionCosts.reduce((total, cost) => {
      return total + (parseFloat(cost.cost) || 0);
    }, 0);
  };

  const calculateTotalCost = (materials, productionCosts) => {
    return calculateMaterialsCost(materials) + calculateProductionCost(productionCosts);
  };

  const calculateProfit = (totalCost, competitorPrice) => {
    const competitor = parseFloat(competitorPrice) || 0;
    const cost = totalCost;
    return competitor - cost;
  };

  const updateMaterial = (value, field, materialIndex, productIndex = null) => {
    if (productIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[productIndex].materials[materialIndex][field] = value;
      setProducts(updatedProducts);
    } else {
      const updatedMaterials = [...newProduct.materials];
      updatedMaterials[materialIndex][field] = value;
      setNewProduct({ ...newProduct, materials: updatedMaterials });
    }
  };

  const updateProductionCost = (value, field, costIndex, productIndex = null) => {
    if (productIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[productIndex].productionCosts[costIndex][field] = value;
      setProducts(updatedProducts);
    } else {
      const updatedCosts = [...newProduct.productionCosts];
      updatedCosts[costIndex][field] = value;
      setNewProduct({ ...newProduct, productionCosts: updatedCosts });
    }
  };

  const updateCompetitorPrice = (value, productIndex) => {
    const updatedProducts = [...products];
    updatedProducts[productIndex].competitorPrice = value;
    setProducts(updatedProducts);
  };

  const addNewProduct = () => {
    if (newProduct.name.trim()) {
      setProducts([...products, { ...newProduct, id: Date.now() }]);
      setNewProduct({
        name: '',
        materials: [{ name: '', quantity: '', unit: 'кг', pricePerUnit: '' }],
        productionCosts: [{ name: '', cost: '' }],
        competitorPrice: ''
      });
    }
  };

  const removeProduct = (productIndex) => {
    const updatedProducts = products.filter((_, index) => index !== productIndex);
    setProducts(updatedProducts);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="bg-slate-900 p-3 rounded-xl">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900">Калькулятор Себестоимости</h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Профессиональный инструмент для расчета себестоимости строительных блоков и брусчатки
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Калькулятор
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Сводная таблица
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-8">{/* Calculator Tab Content */}

        {/* Add New Product Form */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-slate-900 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Добавить новый продукт
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div>
              <Label htmlFor="productName" className="text-sm font-medium text-slate-700">
                Название продукта
              </Label>
              <Input
                id="productName"
                placeholder="Введите название продукта"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="mt-1"
              />
            </div>

            {/* Materials Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-slate-700">Сырье и материалы</Label>
                <Button 
                  onClick={() => addMaterial()} 
                  size="sm" 
                  className="bg-slate-700 hover:bg-slate-800"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Добавить материал
                </Button>
              </div>
              
              {newProduct.materials.map((material, index) => (
                <div key={index} className="grid grid-cols-12 gap-3 p-4 bg-slate-50 rounded-lg">
                  <div className="col-span-4">
                    <Input
                      placeholder="Название материала"
                      value={material.name}
                      onChange={(e) => updateMaterial(e.target.value, 'name', index)}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      placeholder="Количество"
                      value={material.quantity}
                      onChange={(e) => updateMaterial(e.target.value, 'quantity', index)}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      placeholder="Единица"
                      value={material.unit}
                      onChange={(e) => updateMaterial(e.target.value, 'unit', index)}
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      type="number"
                      placeholder="Цена за единицу"
                      value={material.pricePerUnit}
                      onChange={(e) => updateMaterial(e.target.value, 'pricePerUnit', index)}
                    />
                  </div>
                  <div className="col-span-1 flex items-center">
                    {newProduct.materials.length > 1 && (
                      <Button
                        onClick={() => removeMaterial(index)}
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Production Costs Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-slate-700">Производственные затраты</Label>
                <Button 
                  onClick={() => addProductionCost()} 
                  size="sm"
                  className="bg-slate-700 hover:bg-slate-800"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Добавить затрату
                </Button>
              </div>
              
              {newProduct.productionCosts.map((cost, index) => (
                <div key={index} className="grid grid-cols-12 gap-3 p-4 bg-slate-50 rounded-lg">
                  <div className="col-span-8">
                    <Input
                      placeholder="Название затраты"
                      value={cost.name}
                      onChange={(e) => updateProductionCost(e.target.value, 'name', index)}
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      type="number"
                      placeholder="Стоимость"
                      value={cost.cost}
                      onChange={(e) => updateProductionCost(e.target.value, 'cost', index)}
                    />
                  </div>
                  <div className="col-span-1 flex items-center">
                    {newProduct.productionCosts.length > 1 && (
                      <Button
                        onClick={() => removeProductionCost(index)}
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Competitor Price */}
            <div>
              <Label htmlFor="competitorPrice" className="text-sm font-medium text-slate-700">
                Цена конкурентов
              </Label>
              <Input
                id="competitorPrice"
                type="number"
                placeholder="Введите цену конкурентов"
                value={newProduct.competitorPrice}
                onChange={(e) => setNewProduct({ ...newProduct, competitorPrice: e.target.value })}
                className="mt-1"
              />
            </div>

            <Button 
              onClick={addNewProduct} 
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5"
            >
              <Plus className="w-4 h-4 mr-2" />
              Добавить продукт
            </Button>
          </CardContent>
        </Card>

        {/* Products List */}
        {products.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-slate-900" />
              <h2 className="text-2xl font-bold text-slate-900">Анализ продуктов</h2>
            </div>

            {products.map((product, productIndex) => {
              const materialsCost = calculateMaterialsCost(product.materials);
              const productionCost = calculateProductionCost(product.productionCosts);
              const totalCost = calculateTotalCost(product.materials, product.productionCosts);
              const profit = calculateProfit(totalCost, product.competitorPrice);

              return (
                <Card key={product.id || productIndex} className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-t-lg">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <Button
                        onClick={() => removeProduct(productIndex)}
                        size="sm"
                        variant="outline"
                        className="text-red-200 border-red-200 hover:bg-red-100 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {/* Materials */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-slate-800">Материалы</h3>
                        <Button 
                          onClick={() => addMaterial(productIndex)} 
                          size="sm"
                          className="bg-slate-700 hover:bg-slate-800"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Добавить
                        </Button>
                      </div>
                      
                      {product.materials.map((material, materialIndex) => (
                        <div key={materialIndex} className="grid grid-cols-12 gap-3 p-4 bg-slate-50 rounded-lg">
                          <div className="col-span-4">
                            <Input
                              placeholder="Название материала"
                              value={material.name}
                              onChange={(e) => updateMaterial(e.target.value, 'name', materialIndex, productIndex)}
                            />
                          </div>
                          <div className="col-span-2">
                            <Input
                              type="number"
                              placeholder="Количество"
                              value={material.quantity}
                              onChange={(e) => updateMaterial(e.target.value, 'quantity', materialIndex, productIndex)}
                            />
                          </div>
                          <div className="col-span-2">
                            <Input
                              placeholder="Единица"
                              value={material.unit}
                              onChange={(e) => updateMaterial(e.target.value, 'unit', materialIndex, productIndex)}
                            />
                          </div>
                          <div className="col-span-2">
                            <Input
                              type="number"
                              placeholder="Цена"
                              value={material.pricePerUnit}
                              onChange={(e) => updateMaterial(e.target.value, 'pricePerUnit', materialIndex, productIndex)}
                            />
                          </div>
                          <div className="col-span-1">
                            <div className="text-sm font-medium text-slate-700 p-2">
                              {((parseFloat(material.quantity) || 0) * (parseFloat(material.pricePerUnit) || 0)).toFixed(2)} ₽
                            </div>
                          </div>
                          <div className="col-span-1 flex items-center">
                            {product.materials.length > 1 && (
                              <Button
                                onClick={() => removeMaterial(materialIndex, productIndex)}
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      <div className="text-right">
                        <span className="text-lg font-semibold text-slate-800">
                          Итого материалы: {materialsCost.toFixed(2)} ₽
                        </span>
                      </div>
                    </div>

                    <Separator />

                    {/* Production Costs */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-slate-800">Производственные затраты</h3>
                        <Button 
                          onClick={() => addProductionCost(productIndex)} 
                          size="sm"
                          className="bg-slate-700 hover:bg-slate-800"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Добавить
                        </Button>
                      </div>
                      
                      {product.productionCosts.map((cost, costIndex) => (
                        <div key={costIndex} className="grid grid-cols-12 gap-3 p-4 bg-slate-50 rounded-lg">
                          <div className="col-span-10">
                            <Input
                              placeholder="Название затраты"
                              value={cost.name}
                              onChange={(e) => updateProductionCost(e.target.value, 'name', costIndex, productIndex)}
                            />
                          </div>
                          <div className="col-span-1">
                            <Input
                              type="number"
                              placeholder="Стоимость"
                              value={cost.cost}
                              onChange={(e) => updateProductionCost(e.target.value, 'cost', costIndex, productIndex)}
                            />
                          </div>
                          <div className="col-span-1 flex items-center">
                            {product.productionCosts.length > 1 && (
                              <Button
                                onClick={() => removeProductionCost(costIndex, productIndex)}
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      <div className="text-right">
                        <span className="text-lg font-semibold text-slate-800">
                          Итого производство: {productionCost.toFixed(2)} ₽
                        </span>
                      </div>
                    </div>

                    <Separator />

                    {/* Summary and Competitor Analysis */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700">Общая себестоимость</Label>
                        <div className="text-2xl font-bold text-slate-900 bg-slate-100 p-3 rounded-lg text-center">
                          {totalCost.toFixed(2)} ₽
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700">Цена конкурентов</Label>
                        <Input
                          type="number"
                          placeholder="Цена конкурентов"
                          value={product.competitorPrice}
                          onChange={(e) => updateCompetitorPrice(e.target.value, productIndex)}
                          className="text-center text-lg font-medium"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-slate-700">Потенциальная прибыль</Label>
                        <div className={`text-2xl font-bold p-3 rounded-lg text-center ${
                          profit > 0 
                            ? 'text-emerald-700 bg-emerald-50' 
                            : profit < 0 
                              ? 'text-red-700 bg-red-50' 
                              : 'text-slate-700 bg-slate-100'
                        }`}>
                          {profit > 0 ? '+' : ''}{profit.toFixed(2)} ₽
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CostCalculator;