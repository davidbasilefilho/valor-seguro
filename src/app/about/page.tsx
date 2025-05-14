import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-primary">
        Sobre o Valor Seguro
      </h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-accent-foreground">
          Assuma o Controle de Suas Finanças
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          O Valor Seguro é uma ferramenta de gestão financeira pessoal projetada
          para capacitá-lo a entender e gerenciar seu dinheiro de forma eficaz.
          Nós acreditamos que com as ferramentas certas, qualquer pessoa pode
          alcançar seus objetivos financeiros. Nossa plataforma oferece uma
          maneira clara e simples de acompanhar sua saúde financeira, para que
          você possa tomar decisões informadas e construir um futuro financeiro
          seguro.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-accent-foreground">
          Como o Valor Seguro Ajuda Você
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary-foreground bg-primary rounded-t-md -m-6 p-4 mb-2">
                Registre Despesas e Ganhos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Registre facilmente todas as suas transações, sejam despesas
                diárias ou receitas. Mantenha um histórico detalhado de onde seu
                dinheiro vem e para onde vai. Este é o primeiro passo para
                entender seus hábitos financeiros.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary-foreground bg-primary rounded-t-md -m-6 p-4 mb-2">
                Acompanhe Seus Orçamentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Configure orçamentos personalizados para diferentes categorias de
                gastos (por exemplo, supermercado, entretenimento, contas). O
                Valor Seguro ajuda você a monitorar seus gastos em relação a esses
                orçamentos, enviando alertas para que você possa se manter no
                caminho certo e evitar gastos excessivos.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-primary-foreground bg-primary rounded-t-md -m-6 p-4 mb-2">
                Monitore Sua Situação Financeira
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Obtenha uma visão abrangente de sua saúde financeira com gráficos
                e relatórios intuitivos. Entenda seu patrimônio líquido, fluxo de
                caixa e padrões de gastos rapidamente. Tome decisões baseadas em
                dados para melhorar seu bem-estar financeiro.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4 text-accent-foreground">
          Comece Sua Jornada para a Clareza Financeira Hoje!
        </h2>
        <p className="text-lg text-muted-foreground">
          Junte-se ao Valor Seguro e dê o primeiro passo em direção a uma vida
          financeira mais organizada e segura.
        </p>
      </section>
    </div>
  );
}
