import { Model, QueryBuilder, QueryBuilderSingle, Transaction } from 'objection';

class BaseQueryBuilder<T> extends QueryBuilder<T> {
  session(session: any) {
    return this.mergeContext({ session });
  }
}

// try to override $query() method to return correct query builder
class BaseModelDollarQueryOverrideTest extends Model {
  static QueryBuilder = BaseQueryBuilder;
  static RelatedQueryBuilder = BaseQueryBuilder;

  $query(trx?: Transaction): BaseQueryBuilder<this> {
    return <any> this.$query(trx);
  }
}

// try to override static query() method to return correct query builder
class BaseModelStaticQueryOverrideTest extends Model {
  static QueryBuilder = BaseQueryBuilder;
  static RelatedQueryBuilder = BaseQueryBuilder;

  static query<T>(trx?: Transaction): BaseQueryBuilder<T> {
    return <any> super.query(trx);
  }
}

const testDollar = new BaseModelDollarQueryOverrideTest();
testDollar.$query().session({});

BaseModelStaticQueryOverrideTest.query().session({});
