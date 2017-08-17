import { Model, QueryBuilder, QueryBuilderSingle, Transaction } from 'objection';

class BaseQueryBuilder<T> extends QueryBuilder<T> {
  session(session: any) {
    return this.mergeContext({ session });
  }
}

export class BaseModelDollarQueryOverrideTest extends Model {
  static QueryBuilder = BaseQueryBuilder;
  static RelatedQueryBuilder = BaseQueryBuilder;

  $query(trx?: Transaction): BaseQueryBuilder<this> {
    return <any> this.$query(trx);
  }
}

export class BaseModelStaticQueryOverrideTest extends Model {
  static QueryBuilder = BaseQueryBuilder;
  static RelatedQueryBuilder = BaseQueryBuilder;

  static query<T>(trx?: Transaction): BaseQueryBuilder<T> {
    return <any> super.query(trx);
  }
}

const testDollar = new BaseModelDollarQueryOverrideTest();
testDollar.$query().session({});


BaseModelStaticQueryOverrideTest.query().session({});
