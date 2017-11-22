import datetime
from django.test import TestCase
from authentication.models import CustomUser
from literature.models import LiteratureItem
from unittest import mock

TEST_TIME = datetime.datetime(2017, 10, 15, 8, 15, 12)


class LiteratureItemTestCase(TestCase):
    """TestCase for LiteratureItem model"""

    def setUp(self):
        with mock.patch('django.utils.timezone.now') as mock_time:
            mock_time.return_value = TEST_TIME

            user = CustomUser(id=111,
                              email="email2",
                              password="pass2",
                              first_name="firstname2",
                              middle_name="middle2",
                              last_name="last2")
            user.save()

            literature = LiteratureItem(id=111,
                                        title='title',
                                        description='description',
                                        source='source',
                                        author=user)
            literature.save()

    def test_literature_parameters_to_dict(self):
        """Method that tests `to_dict` method of certain LiteratureItem instance."""
        literature = LiteratureItem.objects.get(id=111)
        expect_literature_dict = {'id': 111,
                                  'title': 'title',
                                  'description': 'description',
                                  'source': 'source',
                                  'create_at': 1508044512,
                                  'update_at': 1508044512,
                                  'author': 111
                                  }

        actual_literature_dict = literature.to_dict()
        self.assertEqual(actual_literature_dict, expect_literature_dict)

    def test_literature_none_get_by_id(self):
        """Method that tests `to_dict` method of certain LiteratureItem instance."""
        literature = LiteratureItem.get_by_id(113)
        self.assertIsNone(literature)

    def test_literature_get_by_id(self):
        """Method that tests `to_dict` method of certain LiteratureItem instance."""
        literature = LiteratureItem.get_by_id(111)
        self.assertEqual(literature.id, 111)

    def test_literature_repr(self):
        """Method that test `__repr__` method of LiteratureItem instance object."""
        literature = LiteratureItem.objects.get(id=111)

        actual_repr = literature.__repr__()
        expected_repr = 'id:111 title:title description:description source:source author:111'
        self.assertEqual(actual_repr, expected_repr)

    def test_literature_str(self):
        """Method that test `__repr__` method of LiteratureItem instance object."""
        literature = LiteratureItem.objects.get(id=111)

        actual_repr = literature.__str__()
        expected_repr = 'id:111 title:title description:description source:source author:111'
        self.assertEqual(actual_repr, expected_repr)

    def test_literature_success_create(self):
        """Method that tests succeeded `create` method of LiteratureItem class object."""
        author = CustomUser.objects.get(id=111)
        created_literature = LiteratureItem.create(title="my title",
                                                   source="source of book",
                                                   author=author)
        self.assertIsInstance(created_literature, LiteratureItem)

    def test_literature_update(self):
        """Method that tests `update` method of certain LiteratureItem instance."""

        actual_literature = LiteratureItem.get_by_id(111)
        actual_literature.update(title='new title',
                                 description='new description',
                                 source='new source')
        expected_literature = LiteratureItem.objects.get(id=111)
        self.assertEqual(actual_literature, expected_literature)

    def test_literature_success_delete(self):
        """Method that tests succeeded `delete_by_id` method of LiteratureItem class object."""

        is_literature_delete = LiteratureItem.delete_by_id(111)
        self.assertTrue(is_literature_delete)

    def test_literature_unsuccessful_delete(self):
        """Method that tests unsuccessful `delete_by_id` method of LiteratureItem class object."""

        id_literature_delete = LiteratureItem.delete_by_id(112)
        self.assertIsNone(id_literature_delete)