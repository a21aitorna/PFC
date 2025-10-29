from flask_marshmallow import Marshmallow

ma = Marshmallow()

class LibroCategoriaSchema(ma.Schema):
    class Meta:
        fields = ('id_book_category', 'book_id', 'category_id')