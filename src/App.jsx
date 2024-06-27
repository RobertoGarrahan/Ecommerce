import React, { useState, useRef, useEffect } from "react";
import bengala from "./assets/bengala.png";
import cadeira from "./assets/cadeira.png";
import oculos from "./assets/oculos.png";
import aparelho from "./assets/aparelho.jpg";
import barras from "./assets/barras.jpg";
import caneta from "./assets/caneta.jpg";
import muleta from "./assets/muleta.png";
import braille from "./assets/braille.png";
import soro from "./assets/soro.png";
import bandaid from "./assets/bandaid.png";
import protese from "./assets/protese.png";
import lentes from "./assets/lentes.png";
import pix from "./assets/pix.jpg";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {
  const [showModal2, setShowModal2] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [voices, setVoices] = useState([]);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const toast = useRef(null);
  const audioPlayedRef = useRef(false);

  //opções de vozes
  useEffect(() => {
    const synth = window.speechSynthesis;
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };

    synth.onvoiceschanged = loadVoices;
    loadVoices();

    //reproduzir áudio ao abrir o modal uma vez
    if (showModal2 && !audioPlayedRef.current) {
      const utterance = new SpeechSynthesisUtterance(
        "Precisa de assistência auditiva?"
      );
      utterance.lang = "pt-BR";
      utterance.rate = 1.2;
      const voice = voices.find((voice) => voice.lang === "pt-BR");
      if (voice) {
        utterance.voice = voice;
      }
      synth.speak(utterance);
      audioPlayedRef.current = true;
    }
  }, [showModal2, voices]);

  //informações dos produtos
  const products = [
    {
      id: 0,
      name: "Bengala Dobrável",
      price: "R$54",
      imageSrc: bengala,
      imageAlt:
        "Bengala dobrável branca e preta com detalhes vermelhos, ideal para mobilidade de pessoas com deficiência visual.",
      descricao:
        "Esta bengala dobrável é leve e resistente, perfeita para ajudar na mobilidade de pessoas com deficiência visual. Seu design compacto facilita o transporte e o armazenamento.",
    },
    {
      id: 1,
      name: "Cadeira de Rodas",
      price: "R$400",
      imageSrc: cadeira,
      imageAlt:
        "Cadeira de rodas manual com estrutura de metal preta e assento acolchoado, projetada para facilitar a locomoção de pessoas com mobilidade reduzida.",
      descricao:
        "Cadeira de rodas manual, projetada para oferecer conforto e facilidade de locomoção para pessoas com mobilidade reduzida. Possui estrutura durável e assento acolchoado.",
    },
    {
      id: 2,
      name: "Óculos Escuros",
      price: "R$30",
      imageSrc: oculos,
      imageAlt:
        "Óculos escuros com armação preta, oferecendo proteção solar para pessoas com sensibilidade à luz.",
      descricao:
        "Óculos escuros com proteção UV, ideais para pessoas com sensibilidade à luz. Armação estilosa e lentes escuras oferecem conforto e proteção.",
    },
    {
      id: 3,
      name: "Aparelho Auditivo",
      price: "R$2000",
      imageSrc: aparelho,
      imageAlt:
        "Par de aparelhos auditivos digitais cor creme, destinados a amplificar sons para pessoas com deficiência auditiva.",
      descricao:
        "Aparelho auditivo digital de alta qualidade, amplifica os sons para melhorar a audição de pessoas com deficiência auditiva. Compacto e discreto, ajusta-se confortavelmente.",
    },
    {
      id: 4,
      name: "Barras de Apoio",
      price: "R$125",
      imageSrc: barras,
      imageAlt:
        "Conjunto de três barras de apoio de metal cromado, utilizadas para segurança e suporte em banheiros e outras áreas.",
      descricao:
        "Conjunto de barras de apoio em aço inoxidável, essenciais para garantir segurança em banheiros e outras áreas da casa. Fáceis de instalar e extremamente duráveis.",
    },
    {
      id: 5,
      name: "Caneta de Insulina",
      price: "R$675",
      imageSrc: caneta,
      imageAlt:
        "Caneta de insulina azul em embalagem, usada para administração de insulina em pessoas com diabetes.",
      descricao:
        "Caneta de insulina de alta precisão, fácil de usar e transportar. Projetada para a administração segura de insulina em pessoas com diabetes.",
    },
    {
      id: 6,
      name: "Muletas de apoio",
      price: "R$85",
      imageSrc: muleta,
      imageAlt:
        "Par de muletas de metal ajustáveis, projetadas para ajudar na mobilidade de pessoas com dificuldades para caminhar.",
      descricao:
        "Par de muletas ajustáveis, feitas de alumínio leve e resistente. Proporcionam suporte adicional para caminhar, ideal para recuperação de lesões e mobilidade diária.",
    },
    {
      id: 7,
      name: "Livro de Braille",
      price: "R$22",
      imageSrc: braille,
      imageAlt:
        "Livro com texto em braille, utilizado por pessoas com deficiência visual para leitura tátil.",
      descricao:
        "Livro educativo em Braille, perfeito para aprendizado e leitura de pessoas com deficiência visual. Impressão de alta qualidade com texto claro e legível.",
    },
    {
      id: 8,
      name: "Soro Fisiológico",
      price: "R$8",
      imageSrc: soro,
      imageAlt: "Foto de uma garrafa de 500ml de soro fisiológico.",
      descricao:
        "Soro fisiológico estéril, ideal para limpeza de feridas, hidratação nasal e outras aplicações médicas. Embalagem prática e segura.",
    },
    {
      id: 9,
      name: "Caixa de Band-Aid",
      price: "R$4",
      imageSrc: bandaid,
      imageAlt:
        "Foto de uma embalagem de band-aid transparente, a embalagem é branca e azul com a logo vermelha.",
      descricao:
        "Curativo adesivo hipoalergênico, ideal para pequenos cortes e arranhões. Proporciona proteção e acelera o processo de cicatrização.",
    },
    {
      id: 10,
      name: "Prótese Ortopédica",
      price: "R$3000",
      imageSrc: protese,
      imageAlt:
        "Uma prótese metálica com o revestimento de silicone e detalhes marrom.",
      descricao:
        "Prótese ortopédica de alta qualidade, feita sob medida para substituir membros perdidos. Oferece conforto e funcionalidade para usuários.",
    },
    {
      id: 11,
      name: "Lentes de Contato",
      price: "R$150",
      imageSrc: lentes,
      imageAlt:
        "Foto de lentes de contato na cor verde, a embalagem é branca e a tampa é preta.",
      descricao:
        "Lentes de contato coloridas, oferecendo correção visual e uma mudança sutil na cor dos olhos. Confortáveis para uso diário com alta permeabilidade ao oxigênio.",
    },
  ];

  //clicar no produto
  const handleProductClick = (product) => {
    setSelectedProduct({ ...product, quantity: 1 });
    setShowModal(true);
  };

  //adicionar item ao carrinho
  const addToCart = () => {
    const itemInCart = cartItems.find((item) => item.id === selectedProduct.id);
    if (itemInCart) {
      itemInCart.quantity += selectedProduct.quantity;
      setCartItems([
        ...cartItems.filter((item) => item.id !== selectedProduct.id),
        itemInCart,
      ]);
    } else {
      setCartItems([...cartItems, selectedProduct]);
    }
    showSuccessToast();
    setShowModal(false);
  };

  //toast de sucesso
  const showSuccessToast = () => {
    toast.current.show({
      severity: "success",
      summary: "Produto Adicionado",
      detail: "O produto foi adicionado ao carrinho com sucesso.",
      life: 3000,
    });
  };

  //tirar itens do carrinho
  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  //calculo de valor total
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      const priceNumber = parseFloat(
        item.price.replace("R$", "").replace(",", ".")
      );
      total += priceNumber * item.quantity;
    });
    return total.toFixed(2);
  };

  //sintetizar o texto
  const speak = (text) => {
    if (!audioEnabled) return;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    //ajustar velocidade da fala
    utterance.rate = 1.7;
    const voice = voices.find((voice) => voice.lang === "pt-BR");
    if (voice) {
      utterance.voice = voice;
    }
    synth.speak(utterance);
  };

  //filtar pesquisa de produtos
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.price.includes(searchTerm)
  );

  //escolha de assistencia auditiva
  const handleAudioChoice = (choice) => {
    setAudioEnabled(choice);
    setShowModal2(false);
  };

  return (
    <div className="bg-black">
      {/* toast de adicionado ao carrinho com sucesso */}
      <Toast ref={toast} position="top-center" />
      {/* carrinho de compras */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
          <div className="bg-black p-8 w-1/3 h-full shadow-lg overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-7xl text-yellow-300 font-bold">Carrinho</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-7xl mb-7 text-yellow-300 font-semibold"
              >
                &times;
              </button>
            </div>
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b"
                  >
                    <div className="ml-4 flex-1">
                      <h3
                        className="text-5xl text-yellow-300 cursor-pointer font-semibold"
                        onClick={() =>
                          speak(`${item.quantity} unidades de ${item.name}`)
                        }
                      >
                        {item.name}
                      </h3>
                      <p
                        className="flex text-yellow-300 cursor-pointer items-center mt-3 font-semibold mb-3 text-4xl"
                        onClick={() =>
                          speak(`${item.quantity} unidades de ${item.name}`)
                        }
                      >
                        {item.price} x {item.quantity}
                        <div onClick={() => speak(`Remover do carrinho`)}>
                          <Button
                            icon="pi pi-trash"
                            className="ml-5 p-button-danger p-button-outlined custom-trash-icon"
                            onClick={() => removeFromCart(item.id)}
                          />
                        </div>
                      </p>
                    </div>
                  </div>
                ))}
                <div className="mt-8 text-5xl text-yellow-300 font-semibold cursor-pointer" onClick={() => speak(`Total: ${calculateTotal()} reais`)}>
                  Total: R$ {calculateTotal()}
                </div>
                {/* Botão Ir para o pagamento */}
                <div className="mt-4" onClick={() => speak(`Ir para o pagamento`)}>
                  <button
                    className="bg-yellow-300 text-black px-4 py-2 mt-8 rounded-lg w-full text-center font-bold text-4xl"
                    onClick={() => setShowCheckout(true)}
                  >
                    Ir para o pagamento
                  </button>
                </div>
                {/* Texto Continuar comprando */}
                <div className="mt-4 text-center" onClick={() => speak(`Continuar comprando`)}>
                  <p
                    onClick={() => setShowCart(false)}
                    className="text-yellow-300 font-semibold text-4xl mt-8 cursor-pointer hover:underline"
                  >
                    Continuar comprando
                  </p>
                </div>
              </>
            ) : (
              <p>O carrinho está vazio.</p>
            )}
          </div>
        </div>
      )}

      {/* Modal de pagamento */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-black p-8 w-2/3 rounded-lg shadow-lg overflow-y-auto border-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-6xl text-yellow-300 font-bold cursor-pointer" onClick={() => speak(`Pagar com cartão`)}>
                Pagar com Cartão
              </h2>
              <button
                onClick={() => setShowCheckout(false)}
                className="text-4xl text-yellow-300 font-semibold"
              >
                &times;
              </button>
            </div>
            <form>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-5xl cursor-pointer text-yellow-300 font-semibold mb-2" onClick={() => speak(`Nome`)}>
                    Nome
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                    placeholder="Thiago Silva de Souza"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-5xl cursor-pointer text-yellow-300 font-semibold mb-2" onClick={() => speak(`Número do cartão`)}>
                    Número do Cartão
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-5xl cursor-pointer text-yellow-300 font-semibold mb-2" onClick={() => speak(`Validade do cartão`)}>
                    Validade
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                    placeholder="MM/AA"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-5xl cursor-pointer text-yellow-300 font-semibold mb-2" onClick={() => speak(`Código de segurança`)}>
                    CVV
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                    placeholder="XXX"
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 items-center">
                <p className="text-6xl font-bold text-yellow-300 cursor-pointer" onClick={() => speak(`Pagar com Pix`)}>
                  Pagar com Pix
                </p>
                <img className="w-2/3 h-auto cursor-pointer" src={pix} alt="Pix QR Code" onClick={() => speak(`QR codi do Pix`)} />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* modal inicial para selecionar se precisa de assitencia auditiva */}
      {showModal2 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-black p-8 rounded-lg w-1/2 mx-auto border-8">
            <div className="flex justify-between items-center mb-4">
              <div></div>
              <button
                onClick={() => setShowModal2(false)}
                className="text-4xl text-yellow-300  font-semibold"
              >
                &times;
              </button>
            </div>
            <h2 className="flex justify-center text-yellow-300 text-5xl pb-10 font-semibold">
              Precisa de Assistência Auditiva?
            </h2>
            <div className="flex justify-center mt-4 pb-10 space-x-10">
              <button
                onClick={() => handleAudioChoice(true)}
                className="bg-yellow-300 text-black font-semibold text-4xl px-6 py-3 rounded hover:bg-gray-600 transition-colors duration-300"
              >
                SIM
              </button>
              <button
                onClick={() => handleAudioChoice(false)}
                className="bg-yellow-300 text-black font-semibold text-4xl px-6 py-3 rounded hover:bg-gray-600 transition-colors duration-300"
              >
                NÃO
              </button>
            </div>
          </div>
        </div>
      )}

      {/* modal do produto */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-black p-8 rounded-lg w-1/2 mx-auto border-8">
            <div className="flex justify-between items-center ">
              <div />
              <button
                onClick={() => setShowModal(false)}
                className="text-7xl font-bold text-yellow-300"
              >
                &times;
              </button>
            </div>
            <h2
              className="text-7xl text-yellow-300 cursor-pointer font-bold"
              onClick={() => speak(`${selectedProduct.name}`)}
            >
              {selectedProduct.name}
            </h2>
            <i
              className="pi pi-volume-up text-6xl mt-4 text-yellow-300 font-extrabold cursor-pointer"
              onClick={() => speak(`${selectedProduct.descricao}`)}
            />
            <p className="text-4xl text-yellow-300 font-normal mt-3 mb-4">
              {selectedProduct.descricao}
            </p>
            <div
              className="text-5xl cursor-pointer text-yellow-300 font-bold mt-6 mb-6"
              onClick={() => speak(`Preço ${selectedProduct.price}`)}
            >
              Preço: {selectedProduct.price}
              <span className="pi pi-volume-up text-6xl ml-4 mt-2 text-yellow-300 font-extrabold cursor-pointer" />
            </div>
            <div
              className="flex items-center mt-6"
              onClick={() => speak(`Selecione a quantidade de itens desejada`)}
            >
              <span className="mr-4 text-5xl cursor-pointer text-yellow-300 font-bold">
                Quantidade:
              </span>
              <Dropdown
                value={selectedProduct.quantity}
                options={[1, 2, 3, 4, 5].map((num) => ({
                  label: num,
                  value: num,
                }))}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, quantity: e.value })
                }
                placeholder="1"
                className="w-36 font-bold"
              />
              <i className="pi pi-volume-up text-6xl ml-4 text-yellow-300 font-extrabold cursor-pointer" />
            </div>
            <div
              className="flex justify-center mt-9"
              onClick={() => speak(`Adicionar ao carrinho`)}
            >
              <Button
                label="Adicionar ao Carrinho"
                icon="pi pi-shopping-cart text-5xl"
                onClick={addToCart}
                className="p-button-success p-button-outlined bg-yellow-300 text-black p-3 rounded-xl font-bold text-5xl space-x-3"
              />
            </div>
          </div>
        </div>
      )}

      {/* header */}
      <div className="bg-black border-b-8">
        <header className="p-5 text-yellow-300 font-semibold flex items-center justify-between">
          <div></div>
          <ul className="flex flex-col lg:flex-row items-center lg:space-x-4 lg:text-6xl font-bold">
            <li className="p-2 cursor-pointer">
              <a onClick={() => speak(`Produtos`)}>Produtos</a>
            </li>
            <li
              className="p-2 cursor-pointer"
              onClick={() => setShowCart(true)}
            >
              <a onClick={() => speak(`Carrinho`)}>Carrinho</a>
            </li>
            <div className="relative" onClick={() => speak(`Buscar produtos`)}>
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-yellow-300 text-black placeholder:text-black placeholder:text-4xl h-10 pl-10 pr-4 rounded-lg text-4xl focus:outline-none"
              />
              <span className="pi pi-search absolute left-3 top-1/2 transform -translate-y-1 text-2xl text-black"></span>
            </div>
          </ul>
          <div className="h-12 w-12"></div>
        </header>
      </div>

      {/* titulo */}
      <div className="flex justify-center font-bold text-yellow-300 text-7xl py-6 cursor-pointer">
        <span onClick={() => speak(`P C D Pode Comprar Daqui`)}>
          PCD - Pode Comprar Daqui
        </span>
      </div>

      {/* produtos */}
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-2 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <a
              key={product.id}
              onClick={() => handleProductClick(product)}
              href={product.href}
              className="group cursor-pointer"
            >
              <div onClick={() => speak(`${product.name}, ${product.price}`)}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="flex">
                  <h3 className="mt-4 text-5xl font-bold text-yellow-300">
                    {product.name}
                  </h3>
                  <i
                    className="pi pi-volume-up text-6xl mt-7 ml-20 text-yellow-300 font-extrabold"
                    onClick={() => speak(`${product.name}, ${product.price}`)}
                  />
                </div>
                <p className="flex justify-between mt-4 text-5xl font-bold text-yellow-300">
                  <span className="font-semibold">{product.price}</span>
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* footer */}
      <div
        id="contact"
        className="bg-black text-yellow-300 flex flex-col items-center justify-center pt-10 lg:pt-20 border-t-8"
      >
        <div className="lg:grid lg:grid-cols-3 gap-4 w-full max-w-4xl mb-10 lg:mb-20">
          <div className="lg:w-1/2 col-span-2 justify-center items-center lg:mb-10 text-center lg:text-left">
            <h2
              className="text-8xl lg:my-2 font-bold cursor-pointer"
              onClick={() => speak(`Pode Comprar Daqui`)}
            >
              Pode Comprar Daqui
            </h2>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-2 pb-4 pt-8 lg:py-0 gap-y-8 gap-x-10 lg:mb-6">
            <span
              className="pi pi-tiktok text-7xl cursor-pointer"
              aria-label="TikTok"
              onClick={() => speak(`Tiqui Toque`)}
            ></span>
            <span
              className="pi pi-facebook text-7xl cursor-pointer"
              aria-label="Facebook"
              onClick={() => speak(`Facebook`)}
            ></span>
            <span
              className="pi pi-youtube text-7xl cursor-pointer"
              aria-label="Youtube"
              onClick={() => speak(`Youtube`)}
            ></span>
            <span
              className="pi pi-instagram text-7xl cursor-pointer"
              aria-label="Instagram"
              onClick={() => speak(`Instagram`)}
            ></span>
            <span
              className="pi pi-twitter text-7xl cursor-pointer"
              aria-label="Twitter"
              onClick={() => speak(`Twitter`)}
            ></span>
          </div>
        </div>

        <hr className="border-t border-yellow-300 w-full lg:w-4/5 mb-6" />
        <div className="text-center text-3xl font-semibold pb-5">
          <p>
            ©{" "}
            <span
              className="cursor-pointer"
              onClick={() => speak(`Roberto Gararran`)}
            >
              Roberto Garrahan
            </span>{" "}
            -{" "}
            <span
              className="cursor-pointer"
              onClick={() => speak(`Gabriel Eiki`)}
            >
              Gabriel Eiki
            </span>{" "}
            -{" "}
            <span
              className="cursor-pointer"
              onClick={() => speak(`Rafael Viana`)}
            >
              Raphael Vianna
            </span>{" "}
            -{" "}
            <span
              className="cursor-pointer"
              onClick={() => speak(`Pedro Souza`)}
            >
              Pedro Souza
            </span>{" "}
            -
            <span
              className="cursor-pointer"
              onClick={() => speak(`Eduardo Costa`)}
            >
              {" "}
              Eduardo Costa
            </span>{" "}
            2024
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
